// mqtt_iammeter_server.js
const fs = require('fs');
const mqtt = require('mqtt');
const WebSocket = require('ws');
const express = require('express');
const http = require('http');

// === 1. Load Config ===
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const { MQTT_BROKER, MQTT_PORT, MQTT_USER, MQTT_PASS, DEVICE_SN } = config;

// === 2. Express Web Server ===
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3000;

// Serve static dashboard HTML
app.use(express.static(__dirname + '/public'));

wss.on('connection', ws => {
  console.log('🌐 Web client connected');
});

// === 3. Connect to IAMMETER MQTT Broker ===
const client = mqtt.connect({
  host: MQTT_BROKER,
  port: MQTT_PORT,
  username: MQTT_USER,
  password: MQTT_PASS,
});

client.on('connect', () => {
  console.log('✅ Connected to IAMMETER MQTT broker');
  const topic = `device/${DEVICE_SN}/realtime`;
  client.subscribe(topic, (err) => {
    if (err) console.error('❌ Subscribe error:', err);
    else console.log(`📡 Subscribed to topic: ${topic}`);
  });
});

// === 4. Handle MQTT Messages ===
client.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    let result = {};

    if (payload.Data) {
      // Single-phase
      const [voltage, current, power] = payload.Data;
      result = {
        type: 'single',
        phases: [{ voltage, current, power }]
      };
    } else if (payload.Datas) {
      // Three-phase
      result = {
        type: 'three',
        phases: payload.Datas.map(([v, c, p]) => ({ voltage: v, current: c, power: p }))
      };
    }

    // Send to all connected WebSocket clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(result));
      }
    });

  } catch (err) {
    console.error('❌ Error parsing MQTT data:', err);
  }
});

client.on('error', err => console.error('❌ MQTT connection error:', err));

// === 5. Start Server ===
server.listen(PORT, () => {
  console.log(`🚀 Dashboard running at http://localhost:${PORT}`);
});

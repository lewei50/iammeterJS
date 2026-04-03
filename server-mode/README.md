# Build Your Own Real-Time Monitoring Dashboard by Subscribing to IAMMETER MQTT Topics

This project helps **enthusiasts and beginners** quickly build a custom real-time energy monitoring dashboard—**without needing to write any code manually**.

All the HTML and JavaScript files in this project were generated directly by **IAMMETER’s GPT Assistant**.

------

## 1. Install Node.js

Install Node.js (LTS version is recommended) from:

https://nodejs.org/

------

## 2. Download This Project and Configure `config.json`

Edit the `config.json` file and set the following three parameters.
 These credentials can be found in the guide:
 https://www.iammeter.com/blog/subscribe-real-time-energy-data-mqtt#iammeter-mqtt-broker-configuration

```
mqtt_user: "",
mqtt_pass: "",
device_sn: ""
```

------

## 3. Install Dependencies

After entering the project folder, run:

```
npm install
```

![image-20251201144840122](https://iammeterglobal.oss-accelerate.aliyuncs.com/img/image-20251201144840122.png)

------

## 4. Start the Dashboard

Visit:

```
http://localhost:3000
```

You will see a real-time monitoring dashboard similar to the following:

![image-20251201142633910](https://iammeterglobal.oss-accelerate.aliyuncs.com/img/image-20251201142633910.png)

------

### Important Reminder

Before running the dashboard, please ensure that your IAMMETER device is configured to **MQTT mode**:

https://www.iammeter.com/blog/subscribe-real-time-energy-data-mqtt#configure-iammeter-meter-to-use-mqtt-mode

![Set meter to MQTT upload mode and configure IAMMETER MQTT Broker parameters](https://iammeterglobal.oss-accelerate.aliyuncs.com/img/image-20251126121416299.png)

You may set the **upload interval** to **6 seconds** temporarily for testing.

------

## Recommended Next Step (Very Interesting!)

Once everything is running properly, try this:

Submit the **HTML file** of your dashboard to the IAMMETER GPT Assistant:
 https://chatgpt.com/g/g-68e9cc3b83408191901b66b524ba5373-iammeter-assistant

Then simply describe the improvements you want—more charts, new layout, custom colors, extra widgets, or any advanced logic.

The assistant can automatically:

- Modify and optimize the existing code
- Add new functions
- Create professional UI upgrades
- Generate entirely new dashboard components

This allows you to develop a customized, advanced monitoring dashboard **even without writing code manually**.
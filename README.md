* [effect](#effect)
* [Introduction](#introduction)
  * [why we do this](#why-we-do-this)
  * [who is this for](#who-is-this-for)
  * [Prepared before](#prepared-before)
* [Basic demo](#basic-demo)
* [Demo1](#demo1)
* [reference](#reference)

# effect

| Number | name  | url                                                          | description                                                  |                                                              |
| ------ | ----- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1      | basic | [basic.html](https://lewei50.github.io/iammeterJS/BasicDemo/Basic.html) | simple example                                               | ![image-20210831110005691](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210831110005691.png) |
| 2      | Demo1 | [demo1.html](https://lewei50.github.io/iammeterJS/Demo1/index.html) | You can configure your MQTT parameter here. And select which power should be display in the chart. | ![image-20210916150515648](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210916150515648.png) |

# Introduction



![image-20210825104453255](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210825104453255.png)

## why we do this 

Although we have try to integrated more UI useful view in IAMMETER-cloud,it can not cover all requirements.
So we have make this project,you can easily develop and customize your own monitor view, only by JS code.

Such as:

- Plot all power values in one chart.
- Display the instant value in a different color when it exceeds the alarm value.
- etc...

## who is this for

IAMMETER-cloud user, who are familiar with JavaScript and has extra monitor view requirements.

## Prepared before

Please 
1 [Upgrade your firmware to the latest version](https://imeter.club/topic/11#latest-update-of-iammeter-mqtt-data-upload-interval-setting-net-metering-mode)
2 [Change the upload mode to MQTT](https://imeter.club/topic/11?sort=recent#11-upload-data-to-iammeter-cloud-using-mqtt)
3 [change the upload interval to 6 seconds](https://imeter.club/topic/11?sort=recent#21-set-the-data-upload-interval)



# Basic demo

[BasicDemo](https://github.com/lewei50/iammeterJS/tree/main/BasicDemo)

This is a simple demo to show how to use the local monitoring webpage.

![image-20210824153943618](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210824153943618.png)

# Demo1

[Demo1](https://github.com/lewei50/iammeterJS/tree/main/Demo1)

You can configure your MQTT parameter here.
And select which power should be display in the chart.![image-20210916150515648](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210916150515648.png)



![image-20210916150621729](https://leweidoc.oss-cn-hangzhou.aliyuncs.com/lewei50/img/iammeter/tmpliu/tmpimage-20210916150621729.png)

# reference

[How to subscribe real time data from IAMMETER](https://imeter.club/topic/20)


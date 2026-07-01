---
title: "机器成本优化项目"
date: 2026-06-19
categories: [Project]
draft: false
---
计算优化前后资源的利用差值
e.g 1000core CPU利用率(60%-30%) = 300core * CPU单价 0.1$

资源类型 
yarn_cpu 0908460003美元/core/天
yarn_mem 0.016755581美元/GB/天
hdfs_storage 0.000077609美元/GB
abase_ssd 0.003219475 美元/GB
abase2_qps 0.000114969美元/qps
GPU-A100 20.45671683美元/卡天
带宽单价 2.501529482美元/Mbps
G02-T4 5.138891767美元/台/天
cache_redis.mem 0.043791738美元/GB/天

任务下线
代码优化
参数优化
队列迁出
TTL缩减
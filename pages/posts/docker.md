---
title: Often used Docker command
date: 2023/3/2
tag: Development, Docker
author: Cloud
---

# Often used Docker command

## Important
- 容器一旦运行，文件映射和端口映射等配置的修改极其困难
- 多个容器运行在同一网络环境下：`docker network create ${自定义网络名}`

## nginx
```sh
docker run --rm nginx cat /etc/nginx/nginx.conf > /data/nginx/conf/nginx.conf
docker run --rm nginx cat /etc/nginx/conf.d/default.conf > /data/nginx/conf/conf.d/default.conf

docker run --privileged=true -itd --name nginx \
--network host \
-v /data/www:/data/www \
-v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /data/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /data/nginx/ssl/:/etc/ssl \
-v /data/nginx/logs:/var/log/nginx nginx \
nginx -g "daemon off;"
```

## postgreSQL
```sh
docker run --name psql -itd -e POSTGRES_PASSWORD my_password -e POSTGRES_USER root -p 5432:5432 postgres
```

## mysql
```sh
docker run -p 3306:3306 --privileged=true --cap-add=sys_nice --name mysql \
-v ~/dockerMount/mysql/conf:/etc/mysql/conf.d \
-v ~/dockerMount/mysql/logs:/var/log/mysql \
-v ~/dockerMount/mysql/data:/var/lib/mysql \
-v ~/dockerMount/mysql/mysql-files:/var/lib/mysql-files \
-e MYSQL_ALLOW_EMPTY_PASSWORD=root \
-itd mysql

docker run -p 3306:3306 --privileged=true --cap-add=sys_nice --name mysql \
-v /data/mysql/conf:/etc/mysql/conf.d \
-v /data/mysql/logs:/var/log/mysql \
-v /data/mysql/data:/var/lib/mysql \
-v /data/mysql/mysql-files:/var/lib/mysql-files \
-e MYSQL_ALLOW_EMPTY_PASSWORD=root \
-itd mysql
```

```sql
use mysql;
create user 'root'@'%' identified by 'my_password';
alter user 'root'@'%' identified with mysql_native_password by 'my_password';
grant all privileges on *.* to 'root'@'%';
flush privileges;
```

## MongoDB
```sh
docker run --rm mongo cat /etc/mongod.conf > /data/mongo/mongod.conf

docker run --privileged=true -itd -p 27017:27017 --name mongo \
-v /data/mongo/data:/data/mongo/db \
-v /data/mongo/log:/data/mongo/log \
-v /data/mongo/mongod.conf:/etc/mongod.conf mongo \
mongod -f /etc/mongod.conf --port 27017 \
--dbpath /data/mongo/db \
--logpath /data/mongo/log/mongodb.log \
--replSet encloud
```

## Redis
`redis.conf`中`daemonize=NO`非后台模式

后台模式会导致`docker`无任务可做而退出

启动redis容器命令：
```sh
docker run --privileged=true --name redis -itd -p 6379:6379 \
-v /data/redis/data:/data \
-v /data/redis/log:/log \
-v /data/redis/redis.conf:/etc/redis/redis.conf redis \
redis-server /etc/redis/redis.conf --appendonly yes

mkdir ~/dockerMount/redis/data -p && \
mkdir ~/dockerMount/redis/log -p && \
touch ~/dockerMount/redis/redis.conf && \
chmod 777 ~/dockerMount/redis/ -R && \
docker run --privileged=true --name redis -itd -p 6379:6379 \
-v ~/dockerMount/redis/data:/data \
-v ~/dockerMount/redis/log:/log \
-v ~/dockerMount/redis/redis.conf:/etc/redis/redis.conf redis \
redis-server /etc/redis/redis.conf --appendonly yes

# 命令主体
docker run
# 让redis容器内的root拥有真正的root权限，否则只有普通用户的权限
--privileged=true
# 为容器命名
--name redis
# 指定网络环境，以便容器间的通信
--network ${网络名}
--network-alias redis
# 后台运行容器
-d
# 端口映射
-p 6379:6379
# 储存空间映射
-v ~/data:/data
# 配置文件映射，redis默认无配置启动
-v /usr/etc/redis.conf:/etc/redis/redis.conf
# 镜像名
redis
# 容器执行指令
redis-server
# 使用映射过去的配置文件启动
/etc/redis/redis.conf
# 开启redis持久化
--appendonly yes
```

## elasticsearch
```sh
docker run -itd --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.14.2
```

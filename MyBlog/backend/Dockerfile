# /usr/src/nodejs/hello-docker/Dockerfile
FROM node:18.17.1

RUN npm install -g nodemon

# 在容器中创建一个目录
RUN mkdir -p /blog/backend

# 定位到容器的工作目录
WORKDIR /blog/backend

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package.json /blog/backend/package.json
RUN cd /blog/backend/
RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下
COPY . /blog/backend


EXPOSE 3000

CMD ["npm", "run", "dev"]

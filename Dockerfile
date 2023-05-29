FROM node:18

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . ./app
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3339

CMD pnpm start

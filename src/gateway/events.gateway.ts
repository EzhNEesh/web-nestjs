import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
//import { PostsService } from "../posts/posts.service";
//import { AppService } from "../app.service";


@WebSocketGateway({
  cors: {
    origin: '*'
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(/*private postsService: PostsService*/) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('post_created')
  async handleSendMessage(socket: Socket): Promise<void> {
    //await this.postsService.create('meow');
    this.server.emit('postCreated', 'New post created');
  }

  async broadcast(new_post: any){
    this.server.emit('postCreated', new_post)
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Выполняем действия
  }
}
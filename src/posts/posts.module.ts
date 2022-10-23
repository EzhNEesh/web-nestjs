import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule} from "../auth/auth.module";
import { EventsGateway } from "../gateway/events.gateway";

@Module({
  imports: [AuthModule],
  controllers: [PostsController],
  providers: [PostsService, EventsGateway]
})
export class PostsModule {}

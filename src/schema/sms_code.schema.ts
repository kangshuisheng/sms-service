import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

type SmsCodeDocument = SmsCode & Document;

@Schema()
class SmsCode {
  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  code: number;
}
const SmsCodeSchema = SchemaFactory.createForClass(SmsCode);

export { SmsCode, SmsCodeSchema, SmsCodeDocument };

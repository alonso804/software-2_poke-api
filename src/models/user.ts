import { getModelForClass, prop, type ReturnModelType } from '@typegoose/typegoose';
import type { Document } from 'mongoose';

export class Test {
  @prop()
  name: string;

  static async findByName(
    this: ReturnModelType<typeof Test>,
    name: string,
  ): Promise<TestDocument | null> {
    return this.findOne({ name });
  }
}

export type TestDocument = Test & Document;

const TestModel = getModelForClass(Test);
export default TestModel;

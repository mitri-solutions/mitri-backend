import { UpdateQuery } from 'mongoose';
import { IUpdate, IUpdateParam } from './operator.interface';

export class MongoUpdateOperator<T> implements IUpdate<T> {
  getUpdate<P extends string = never>(
    input: IUpdateParam<T, P>,
  ): { update: UpdateQuery<T> } {
    const updateOptions = this.processUpdate<T>(input);
    return { update: updateOptions as UpdateQuery<T> };
  }

  private processUpdate<W extends T>(
    updateInput: IUpdateParam<T> | IUpdateParam<T>[],
  ): Record<string, any> | Record<string, any>[] {
    if (Array.isArray(updateInput)) {
      const updateOptions: Array<Record<string, any>> = [];
      for (let updateInputInstance of updateInput) {
        const baseEntity = updateInputInstance.origin;
        const updateData = updateInputInstance.update;
        const resultUpdate = this.processUpdateField(updateData, baseEntity);
        updateOptions.push(resultUpdate);
      }
      return updateOptions;
    } else {
      const baseEntity = updateInput.origin;
      const updateData = updateInput.update;
      const updateOptions: Record<string, any> = this.processUpdateField(
        updateData,
        baseEntity,
      );

      return updateOptions;
    }
  }

  private processUpdateField(
    updateData: Record<string, any>,
    baseEntity: Record<string, any>,
  ): Record<string, any> {
    let result = baseEntity;
    const keys = Object.keys(updateData);

    for (let key of keys) {
      if (typeof updateData[key] != 'object') {
        result[key] = updateData[key];
      } else {
        result[key] = this.processUpdateField(updateData[key], result[key]);
      }
    }

    return result;
  }
}

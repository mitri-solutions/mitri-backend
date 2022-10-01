/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export interface IFind<T extends ProjectionType<T>> {
  getOption<P extends string = never>(
    input: IFindParam<T, P>,
  ): {
    filter: FilterQuery<T>;
    options?: QueryOptions<T>;
    projection?: string[];
  };
}

export interface IFindParam<T, P extends string = never> {
  filter?: Record<string, any>;
  orderBy?:
    | (string & {
        0?: never;
      })
    | string[];
  query?: any;
  limit?: number;
  offset?: number;
  fields?: string[];
}

export interface IUpdate<T extends ProjectionType<T>> {
  getUpdate<P extends string = never>(
    input: IUpdateParam<T, P>,
  ): {
    update: UpdateQuery<T>;
  };
}

export interface IUpdateParam<T, P extends string = never> {
  origin: Record<string, any>;
  update?: Record<string, any>;
}

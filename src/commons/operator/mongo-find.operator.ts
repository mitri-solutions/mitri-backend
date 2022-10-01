import { FilterQuery, QueryOptions } from 'mongoose';
import { IFind, IFindParam } from './operator.interface';

export class MongoFindOperator<T> implements IFind<T> {
  getOption<P extends string = never>({
    filter = {},
    limit,
    offset,
    orderBy,
    fields,
  }: IFindParam<T, P>): {
    filter: FilterQuery<T>;
    options?: QueryOptions<T>;
    projection?: string[];
  } {
    const filterOptions = this.processWhereOptions<T>(filter);
    let projection: string[] = null;
    const options: QueryOptions<T> = {};
    if (limit) {
      options.limit = limit;
    }
    if (offset) {
      options.skip = offset;
    }

    if (fields) {
      projection = [...fields];
    }

    if (Array.isArray(orderBy)) {
      orderBy.forEach((item) => {
        options.sort = {
          ...options.orderBy,
          ...this.getOrderBy(item),
        };
      });
    } else if (orderBy) {
      options.sort = {
        ...options.orderBy,
        ...this.getOrderBy(orderBy),
      };
    }
    return {
      filter: (filterOptions as FilterQuery<T>) || {},
      projection,
      options,
    };
  }

  private processWhereOptions<W extends T>(
    filter: Record<string, any> | Record<string, any>[],
  ) {
    if (Array.isArray(filter)) {
      const filterOptions: Array<Record<string, any>> = [];
      Object.keys(filter).forEach((k) => {
        const options: Record<string, any> = {};
        for (const index in filter[k]) {
          const key = index as keyof W;
          if (filter[k][key] === undefined) {
            continue;
          }
          const [attr, operator] = this.getQueryConditions(
            String(key),
            filter[k][key],
          );
          options[attr] = operator;
        }
        filterOptions.push(options);
      });
      return filterOptions;
    } else {
      const filterOptions: Record<string, any> = {};
      Object.keys(filter).forEach((k) => {
        const key = k as keyof W as string;
        if (filter[key] !== undefined && key !== 'or') {
          const [attr, operator] = this.getQueryConditions(
            String(key),
            filter[key],
          );
          filterOptions[attr] = { ...filterOptions[attr], ...operator };
        }

        if (filter[key] !== undefined && key === 'or') {
          const filterOptionsOr: any = this.processWhereOr(filter[key]);
          if (filterOptionsOr && Array.isArray(filterOptionsOr))
            filterOptions['$or'] = filterOptionsOr;
        }
      });
      return filterOptions;
    }
  }

  private getQueryConditions(key: string, value: any): [string, any] {
    const parts = key.toString().split('_');
    const operator = parts.length > 1 ? parts.pop() : 'eq';
    const attr = parts[0] === 'id' ? '_id' : parts.join('.');

    switch (operator) {
      case 'eq':
        if (value === null) {
          return [attr, { $eq: null }];
        }
        return [attr, { $eq: value }];
      case 'ne':
        if (value === null) {
          return [attr, { $ne: null }];
        }
        return [attr, { $ne: value }];
      case 'not':
        return [attr, { $not: { $in: [value] } }];
      case 'nin':
        return [attr, { $nin: [...value] }];
      case 'lt':
        return [attr, { $lt: value }];
      case 'lte':
        return [attr, { $lte: value }];
      case 'gt':
        return [attr, { $gt: value }];
      case 'gte':
        return [attr, { $gte: value }];
      case 'in':
        return [attr, { $in: value }];
      case 'contains':
        return [attr, { $regex: new RegExp(`.*${value}.*`, 'i') }];
      case 'startsWith':
        return [attr, { $regex: new RegExp(`^${value}.*`, 'i') }];
      case 'endsWith':
        return [attr, { $regex: new RegExp(`.*${value}$`, 'i') }];
      default:
        throw new Error(`Can't find operator ${operator}`);
    }
  }

  private processWhereOr(filterOr: any) {
    if (filterOr && Array.isArray(filterOr)) {
      return filterOr.map((filter) => {
        return this.processWhereOptions(filter);
      });
    }
    return [];
  }

  private getOrderBy(value: string) {
    const parts = value.toString().split('_');
    const attr = parts[0] === 'id' ? '_id' : parts[0];
    const direction: 'asc' | 'desc' = parts[1].toLowerCase() as 'asc' | 'desc';
    return {
      [attr]: direction,
    };
  }
}

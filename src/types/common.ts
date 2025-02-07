import { Pagination } from '@/types/network';

export type PageProps<Param = null> = {
  searchParams: Pagination
  params: Param;
};


type GetNestedKeyOf<ObjectType extends object> =
  { [Key in keyof ObjectType & (string | number)]-?: ObjectType[Key] extends unknown[]
    ? ObjectType[Key][number] extends object
    ? `${Key}` | `${Key}.${GetNestedKeyOf<ObjectType[Key][number]>}`
    : `${Key}`

    : ObjectType[Key] extends (object)
    ? `${Key}` | `${Key}.${GetNestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

export type NestedKeyOf<ObjectType extends object> = GetNestedKeyOf<Required<ObjectType>>

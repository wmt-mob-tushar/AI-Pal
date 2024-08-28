/* eslint-disable */

interface IncludeKeysProps<T> {
  obj?: Record<string, T>;
  keys?: string[];
}

const includeKeys = <T,>({
  obj = {},
  keys = [],
}: IncludeKeysProps<T>): Record<string, T> => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Record<string, T>);
};
export {includeKeys};

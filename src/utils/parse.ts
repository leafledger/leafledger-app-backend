// Converts comma separated "key:value" into an array Object for sorting or filtering
export function parseKeyValueString(
  queryType: string,
  str: string,
  mapperFunc: (key: string, value: string) => any,
  allowedKeys: string[] = [],
) {
  return str.split(',').map((item: string) => {
    const [key, value] = item.split(':');
    if (!allowedKeys.includes(key))
      throw new Error(`Invalid key: ${key} for ${queryType}`);
    return mapperFunc(key, value);
  });
}

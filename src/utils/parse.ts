
// Converts comma separated "key:value" into an array Object for sorting or filtering
export function parseKeyValueString(str: string, mapperFunc: (key: string, value: string) => any) {
    return str.split(',').map((item: string) => {
        const [key, value] = item.split(':')
        return mapperFunc(key, value);
    })
}
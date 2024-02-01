const redisSpecialCharsRegex = /[?[\]*^]/;

type BuildRedisKeyParamValue = string | number | boolean;

function prepareRedisKeyParamsValue(
  value: BuildRedisKeyParamValue,
): string | number {
  if (typeof value === 'string') {
    return value.replace(new RegExp(redisSpecialCharsRegex, 'g'), '\\$&');
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value;
}

type Params = { [x: string]: BuildRedisKeyParamValue };

export type CacheKey = { mainKey: string; detailsKey: string };

const buildKeyParamsPart = (params: Params): string =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${prepareRedisKeyParamsValue(value)}`)
    .join('_');

export function buildCacheKey(
  base: string,
  params: Params,
  additionalParams?: Params,
): CacheKey {
  const mainKeyParamsPart = buildKeyParamsPart(params);
  return {
    mainKey: `${base}${mainKeyParamsPart ? '_' : ''}${mainKeyParamsPart}`,
    detailsKey: additionalParams
      ? buildKeyParamsPart(additionalParams)
      : 'DEFAULT',
  };
}

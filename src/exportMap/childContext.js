import { hashObject } from 'eslint-module-utils/hash';

let parserOptionsHash = '';
let prevParserOptions = '';
let settingsHash = '';
let prevSettings = '';
let languageOptionsHash = '';
let prevLanguageOptions = '';

/**
 * don't hold full context object in memory, just grab what we need.
 * also calculate a cacheKey, where parts of the cacheKey hash are memoized
 */
export default function childContext(path, context) {
  const { settings, parserOptions, languageOptions, parserPath } = context;

  if (JSON.stringify(settings) !== prevSettings) {
    settingsHash = hashObject({ settings }).digest('hex');
    prevSettings = JSON.stringify(settings);
  }

  if (JSON.stringify(parserOptions) !== prevParserOptions) {
    parserOptionsHash = hashObject({ parserOptions }).digest('hex');
    prevParserOptions = JSON.stringify(parserOptions);
  }

  if (JSON.stringify(languageOptions) !== prevLanguageOptions) {
    languageOptionsHash = hashObject({ languageOptions }).digest('hex');
    prevLanguageOptions = JSON.stringify(languageOptions);
  }

  return {
    cacheKey: String(parserPath) + parserOptionsHash + settingsHash + languageOptionsHash + String(path),
    settings,
    parserOptions,
    languageOptions,
    parserPath,
    path,
  };
}

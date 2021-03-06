import { isObject } from './object';
import { isBasicPrimitiveTypeof } from './primitive';
import { TemplateMap, TypeofToType, TypeofValue } from './types';

const typeofUnknownValueMatchesTypeofValue = <Type extends TypeofValue>(
  unknownObjectValue: unknown,
  typeofValue: Type
): unknownObjectValue is TypeofToType<Type> =>
  typeof unknownObjectValue === typeofValue;

const unknownMatchesTemplate = <ReturnType>(
  unknownVariable: unknown,
  template: TemplateMap<ReturnType>
): unknownVariable is ReturnType => {
  if (typeof template === 'function') {
    return template(unknownVariable);
  }

  // Unknown object must be of an object type to match the template
  if (!isObject(unknownVariable) && !isObject(template)) {
    return typeof unknownVariable === template;
  } else if (!isObject(unknownVariable)) {
    return false;
  }

  // iterate over every template key
  for (const templateKey in template) {
    if (!template.hasOwnProperty(templateKey)) {
      continue;
    }

    type PropertyType = Extract<ReturnType, keyof TemplateMap<ReturnType>>;

    // `templateValue` is either 'string', 'number', 'boolean', 'undefined', 'function' or an object.
    const templateValue = template[templateKey] as PropertyType;
    const unknownObjectValue = unknownVariable[templateKey];

    let propertyMatches: boolean = false;
    if (isBasicPrimitiveTypeof(templateValue)) {
      // If the template value is of primitive typeof, check that it matches
      propertyMatches = typeofUnknownValueMatchesTypeofValue(
        unknownObjectValue,
        templateValue
      );
    } else {
      // If the template value is an object or function, recursively check object's value
      propertyMatches = unknownMatchesTemplate<PropertyType>(
        unknownObjectValue,
        templateValue
      );
    }
    if (!propertyMatches) {
      return false;
    }
  }

  // If all template key|values are included in the unknown object, it matches
  return true;
};

export default unknownMatchesTemplate;

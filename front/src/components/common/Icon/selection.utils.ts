import iconSet from './selection.json';

interface IIcomoonIcon {
  properties: {
    name: string;
  };
}

export function getAllAvailableIcons(sort = true): any {
  const icons = iconSet.icons.map((icon: IIcomoonIcon) => icon.properties.name);
  return sort ? icons.sort() : icons;
}

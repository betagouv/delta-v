import { ButtonSize, IconPosition } from '..';

type classesType = {
  classes?: { [key: string]: boolean };
};

type IIconStyle = {
  loading: classesType;
  size: {
    [key in ButtonSize]?: {
      position: {
        [key in IconPosition]?: classesType;
      };
    } & classesType;
  };
} & classesType;

const styleManager: IIconStyle = {
  classes: {
    'justify-self-stretch': true,
  },
  loading: {
    classes: {
      'animate-spin': true,
      'motion-reduce:hidden': true,
    },
  },
  size: {
    xs: {
      classes: {
        'h-base': true,
        'w-4': true,
      },
      position: {
        left: {
          classes: {
            '-ml-0.5': true,
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
            '-mr-0.5': true,
          },
        },
      },
    },
    sm: {
      classes: {
        'h-6': true,
        'w-base': true,
      },
      position: {
        left: {
          classes: {
            '-ml-0.5': true,
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
            '-mr-0.5': true,
          },
        },
      },
    },
    base: {
      classes: {
        'h-6': true,
        'w-base': true,
      },
      position: {
        left: {
          classes: {
            '-ml-1': true,
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
            '-mr-1': true,
          },
        },
      },
    },
    lg: {
      classes: {
        'h-7': true,
        'w-6': true,
      },
      position: {
        left: {
          classes: {
            '-ml-1': true,
            'mr-3': true,
          },
        },
        right: {
          classes: {
            'ml-3': true,
            '-mr-1': true,
          },
        },
      },
    },
    xl: {
      classes: {
        'h-7': true,
        'w-6': true,
      },
      position: {
        left: {
          classes: {
            '-ml-1': true,
            'mr-3': true,
          },
        },
        right: {
          classes: {
            'ml-3': true,
            '-mr-1': true,
          },
        },
      },
    },
  },
} as const;

interface IGetIconStyleOptions {
  size: ButtonSize;
  position: IconPosition;
  loading: boolean;
}

export const getIconStyle = ({
  size,
  position,
  loading,
}: IGetIconStyleOptions): { [key: string]: boolean } => {
  return {
    ...styleManager.classes,
    ...styleManager.size[size]?.classes,
    ...styleManager.size[size]?.position[position]?.classes,
    ...(loading ? styleManager.loading.classes : {}),
  };
};

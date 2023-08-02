import { ButtonSize, IconPosition } from './button.style';

type ClassesType = {
  classes?: { [key: string]: boolean };
};

type IIconStyle = {
  loading: ClassesType;
  size: {
    [key in ButtonSize]?: {
      size: number;
      position: {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        [key in IconPosition]?: ClassesType;
      };
    } & ClassesType;
  };
} & ClassesType;

const styleManager: IIconStyle = {
  classes: {
    flex: true,
    'items-center': true,
  },
  loading: {
    classes: {
      'animate-spin': true,
      'motion-reduce:hidden': true,
    },
  },
  size: {
    '2xs': {
      size: 4,
      classes: {
        'h-3': true,
      },
      position: {
        left: {
          classes: {
            'mr-1': true,
          },
        },
        right: {
          classes: {
            'ml-1': true,
          },
        },
      },
    },
    xs: {
      size: 8,
      classes: {
        'h-4': true,
      },
      position: {
        left: {
          classes: {
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
          },
        },
      },
    },
    sm: {
      size: 12,
      classes: {
        'h-4': true,
      },
      position: {
        left: {
          classes: {
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
          },
        },
      },
    },
    base: {
      size: 16,
      classes: {
        'h-5': true,
      },
      position: {
        left: {
          classes: {
            'mr-2': true,
          },
        },
        right: {
          classes: {
            'ml-2': true,
          },
        },
      },
    },
    lg: {
      size: 20,
      classes: {
        'h-5': true,
      },
      position: {
        left: {
          classes: {
            'mr-3': true,
          },
        },
        right: {
          classes: {
            'ml-3': true,
          },
        },
      },
    },
    xl: {
      size: 24,
      classes: {
        'h-6': true,
      },
      position: {
        left: {
          classes: {
            'mr-3': true,
          },
        },
        right: {
          classes: {
            'ml-3': true,
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

interface IGetIconSizeOptions {
  size?: ButtonSize;
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

export const getIconSize = ({ size }: IGetIconSizeOptions): number | undefined => {
  return size ? styleManager.size[size]?.size : undefined;
};

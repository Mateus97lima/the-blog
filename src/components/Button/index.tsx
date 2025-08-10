import clsx from 'clsx';

type ButtonVariant = 'default' | 'ghost' | 'danger';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonVariant = {
    default: clsx('bg-blue-600 text-blue-100 hover:bg-blue-800'),
    ghost: clsx('bg-slate-500 text-slate-100 hover:bg-slate-800'),
    danger: clsx('bg-red-600 text-blue-100 hover:bg-red-800'),
  };

  const buttonSizes: Record<ButtonSize, string> = {
    sm: clsx(
      'text-xs/light py-1 px-2 rounded-sm cursor-pointer gap-3',
      '[&_svg]:w-6 [&_svg]:h-6  ',
    ),
    md: clsx(
      'text-base/tight py-2 px-4 rounded-md cursor-pointer gap-3',
      '[&_svg]:w-6 [&_svg]:h-6  ',
    ),
    lg: clsx(
      'text-lg/tight py-2 px-5 rounded-lg cursor-pointer gap-3 ',
      '[&_svg]:w-6 [&_svg]:h-6  ',
    ),
  };
  const buttonClasses = clsx(
    buttonVariant[variant],
    buttonSizes[size],
    'flex  items-center justify-center transition',
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed',
    props.className,
  );

  return (
    <>
      <button {...props} className={buttonClasses} ></button>
    </>
  );
}

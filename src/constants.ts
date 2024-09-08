export const shouldNotForwardPropsWithKeys =
  <CustomProps>(props: Array<keyof CustomProps>) =>
  (propName: PropertyKey): boolean =>
    !props.map((p) => p.toString()).includes(propName.toString());

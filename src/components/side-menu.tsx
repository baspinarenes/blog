export const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { children } = props;

  return (
    <aside className="flex lg:border-r lg:w-60 xl:w-72 bg-zinc-50 flex-shrink-0">{children}</aside>
  );
};

export type SideMenuProps = {
  children: React.ReactNode;
};

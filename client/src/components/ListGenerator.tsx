interface ListGeneratorProps<T> {
  list: T[];
  renderItem: (item: T) => React.ReactNode;
}

const ListGenerator = <T extends unknown>({ list, renderItem }: ListGeneratorProps<T>): JSX.Element => {
  return <>{list.map((item) => renderItem(item))}</>;
};

export default ListGenerator;

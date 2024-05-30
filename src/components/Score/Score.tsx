interface IScore {
  value: number;
}
export default function Score({ value = 0 }: IScore) {
  return (
    <div>
      <span>{`Score:[${value}]`}</span>
    </div>
  );
}

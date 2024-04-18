type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export function FakeBorderRadius({
  position,
  className,
}: {
  position: Position;
  className?: string;
}) {
  const getRadius = (position: Position) => {
    if (position === "topLeft") {
      return (
        <div className="fake-radius w-[200%] h-[200%] absolute top-0 left-0"></div>
      );
    } else if (position === "topRight") {
      return (
        <div className="fake-radius w-[200%] h-[200%] absolute top-0 right-0"></div>
      );
    } else if (position === "bottomLeft") {
      return (
        <div className="fake-radius w-[200%] h-[200%] absolute bottom-0 left-0"></div>
      );
    } else if (position === "bottomRight") {
      return (
        <div className="fake-radius w-[200%] h-[200%] absolute bottom-0 right-0"></div>
      );
    }
  };

  return (
    <div
      className={`aspect-square w-spaced absolute overflow-hidden ${className}`}
    >
      {getRadius(position)}
    </div>
  );
}

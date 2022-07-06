import { FC } from "react";

interface Props {
  image?: string;
  name: string;
}

const CoinNameCell: FC<Props> = ({ image, name }) => (
  <>
    <div className="flex">
      {image ? (
        <img className="pr-5" src={image} alt={`${name} logo`} />
      ) : (
        <div className="h-6 w-6 rounded-full bg-gray-400 mr-2" />
      )}

      <p>
        {name}
      </p>
    </div>
  </>
)

export default CoinNameCell;
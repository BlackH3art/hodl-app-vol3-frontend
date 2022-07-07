import { FC } from "react";

interface Props {
  image?: string;
  name: string;
}

const CoinNameCell: FC<Props> = ({ image, name }) => (
  <>
    <div className="flex items-center">
      {image ? (
        <img className="w-8 h-8 w-full mr-5" src={image} alt={`${name} logo`} />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-400 mr-2" />
      )}

      <p>
        {name.toUpperCase()}
      </p>
    </div>
  </>
)

export default CoinNameCell;
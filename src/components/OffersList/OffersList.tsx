import { Offer } from "../../types";

interface OffersListProps {
  offers: { description: string; apply: Offer }[];
}

const OffersList = ({ offers }: OffersListProps) => {
  return (
    <div>
      <h2>Current Offers</h2>
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>{offer.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default OffersList;

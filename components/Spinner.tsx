import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Spinner() {
  return (
    <FontAwesomeIcon
      className="fa-spin m-3 text-2xl text-gray-400"
      icon={["fas", "spinner"]}
    />
  );
}

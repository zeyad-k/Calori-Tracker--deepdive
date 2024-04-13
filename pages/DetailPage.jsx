import { Link, useParams } from "react-router-dom";

export function DetailPage() {
  const params = useParams();

  return (
    <>
      <p>This is record with id: {params.recordId}</p>
      <Link to=".." relative="path">
        Back to List Page
      </Link>
    </>
  );
}

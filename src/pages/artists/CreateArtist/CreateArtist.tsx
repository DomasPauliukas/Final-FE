import ArtistForm from "../../../components/forms/ArtistForm"

const CreateArtist: React.FC = () => {
  return (
    <div className="form-page-container">
      <h1 className="form-title">Create Artist</h1>
      <ArtistForm />
    </div>
  )
}

export default CreateArtist
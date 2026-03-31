import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSendSubmit = async (searchQuery: string) => {
    try {
      setPhotos([]);
      setIsLoading(true);
      setIsError(false);

      const fetchPhotos = await getPhotos(searchQuery);

      setPhotos(fetchPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSendSubmit} />
          {isLoading && <Loader />}
          {isError && (
            <Text>Whoops, something went wrong! Please try again!</Text>
          )}
          {photos.length > 0 && (
            <PhotosGallery
              photos={photos}
              onSelect={(photo) => setPhoto(photo)}
            />
          )}
        </Container>
      </Section>
      <Toaster />
      {photo && (
        <Modal onClose={() => setPhoto(null)}>
          <div>
            <img src={photo.src.large} alt={photo.alt} />
          </div>
        </Modal>
      )}
    </>
  );
}

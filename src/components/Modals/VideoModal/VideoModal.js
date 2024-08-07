import { useEffect, useRef, useState } from "react";
import FormModal from "../FormModal/FormModal";
import { FormValidator } from "../../../utils/FormValidator";
import { useSearchParams } from "react-router-dom";

function VideoModal(props) {
  function enableValidation() {
    const formElement = formRef.current;
    const newValidator = new FormValidator(formElement, setButtonActivity);
    newValidator.enableValidation();
    setValidator(newValidator);
  }

  function toggleButtonState() {
    validator.toggleButtonState();
  }

  function submit() {
    return props.loadVideo(video, productId, reviewText)
      .then(props.onClose);
  }


  const searchParams = useSearchParams();
  const productId = searchParams[0].get("id");

  const [isButtonActive, setButtonActivity] = useState(false);
  const [validator, setValidator] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    enableValidation();
  }, [formRef]);

  const [video, setVideo] = useState("");
  const [product, setProduct] = useState("");
  const [reviewText, setReviewText] = useState("");

  return (
    <FormModal
      name={props.name}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title="Новый обзор"
      buttonText="Загрузить"
      formRef={formRef}
      isButtonActive={isButtonActive}
      onSubmit={submit}
    >
      <label className="modal__label">
        <p className="modal__label-text">Ссылка на видео*</p>
        <input
          className="modal__input"
          type="url"
          id="video-link"
          placeholder="Ссылка на видео на внешнем сайте"
          onChange={(e) => {
            setVideo(e.target.value);
            toggleButtonState();
          }}
          value={video}
          required
        />
      </label>
      {/* {
        props.product ? "" :
        <label className="modal__label">
          <p className="modal__label-text">Ссылка на продукт*</p>
          <input
            className="modal__input"
            type="url"
            id="video-product"
            placeholder="Ссылка на продукт на нашем сайте"
            onChange={(e) => {
              setProduct(e.target.value);
              toggleButtonState();
            }}
            value={product}
            required
          />
        </label>
      } */}
      <label className="modal__label">
        <p className="modal__label-text">Текст отзыва</p>
        <textarea
          className="modal__textarea"
          id="video-review"
          placeholder="Ваш отзыв на продукт"
          onChange={(e) => {
            setReviewText(e.target.value);
            toggleButtonState();
          }}
          value={reviewText}
        />
      </label>
    </FormModal>
  );
}

export default VideoModal;

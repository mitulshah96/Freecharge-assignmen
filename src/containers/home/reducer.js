import {
  LOAD_IMAGE_REQUEST,
  LOAD_IMAGE,
  LOAD_IMAGE_FAILURE,
  CHANGE_VALUE,
  SAVEMEMES,
  CHANGE_PLACEHOLDER,
  SET_POSITION
} from "../../store/";

export const initialState = {
  query: "",
  placeholder: "",
  position: "top",
  image: {
    url: "",
    loading: false,
    loaded: false
  },
  savedMemes: []
};

export function reducer(state, action) {
  switch (action.type) {
    case LOAD_IMAGE_REQUEST:
      return {
        ...state,
        image: {
          ...state.image,
          loading: true
        }
      };

    case LOAD_IMAGE: {
      return {
        ...state,
        image: {
          ...state.image,
          url: action.url,
          loaded: true,
          loading: false
        }
      };
    }

    case LOAD_IMAGE_FAILURE:
      return {
        ...state,
        image: {
          ...state.image,
          url: "",
          loading: false,
          loaded: true
        }
      };

    case CHANGE_VALUE:
      const query = action.query;
      return {
        ...state,
        query
      };

    case CHANGE_PLACEHOLDER:
      const placeholder = action.placeholder;
      return {
        ...state,
        placeholder
      };

    case SET_POSITION:
      const position = action.position;
      return {
        ...state,
        position
      };

    case SAVEMEMES:
      return {
        ...state,
        savedMemes: [
          ...state.savedMemes,
          {
            ...state.image,
            placeholder: action.placeholder,
            position: action.position
          }
        ]
      };

    default:
      return state;
  }
}

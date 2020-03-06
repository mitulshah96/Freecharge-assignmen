import "./home.scss";
import React, { useRef, useReducer } from "react";
import { Radio } from "antd";
import environments from "../../environments";
import { Loader, ImageGallery } from "../../components";
import { reducer, initialState } from "./reducer";
import {
  LOAD_IMAGE_REQUEST,
  LOAD_IMAGE,
  LOAD_IMAGE_FAILURE,
  CHANGE_VALUE,
  CHANGE_PLACEHOLDER,
  SET_POSITION,
  SAVEMEMES
} from "../../store";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const canvasRef = useRef();

  async function getMemes() {
    try {
      dispatch({
        type: LOAD_IMAGE_REQUEST
      });
      const payload = await (
        await fetch(
          `${environments.BASE_URL}/v1/images/search?query=${state.query}`
        )
      ).json();
      if (payload.images.length > 0) {
        dispatch({
          type: LOAD_IMAGE,
          url: payload.images[0].url
        });
      } else {
        throw new Error("No Image Found.");
      }
    } catch (error) {
      dispatch({
        type: LOAD_IMAGE_FAILURE
      });
    }
  }

  function calculatePosition(context, position) {
    if (position === "top") {
      return 30;
    } else if (position === "center") {
      return context.canvas.height / 2;
    } else {
      return context.canvas.height - 10;
    }
  }

  function onChangePosition(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    dispatch({ type: SET_POSITION, position: e.target.value.trim() });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderText(ctx, state.placeholder, e.target.value);
  }

  function renderText(context, placeholder, position) {
    const textWidth = context.measureText(placeholder).width;
    context.font = "14px Courier";
    context.fillStyle = "#FFF";
    context.textAlign = "middle";
    context.fontSize = 10;
    context.fillText(
      placeholder,
      context.canvas.width / 2 - textWidth / 2,
      calculatePosition(context, position)
    );
  }

  function onChangeText(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const text = e.target.value.trim();

    dispatch({
      type: CHANGE_PLACEHOLDER,
      placeholder: text
    });

    renderText(ctx, text, state.position);
  }

  function saveMeme() {
    dispatch({
      type: SAVEMEMES,
      placeholder: state.placeholder,
      position: state.position
    });
  }

  return (
    <div className="container">
      <div className="column1">
        <div className="row">
          <input
            placeholder="Enter your search query here ..."
            name="query"
            // onChange={e => setQuery(e.target.value.trim())}
            onChange={e =>
              dispatch({
                type: CHANGE_VALUE,
                query: e.target.value.trim()
              })
            }
            className="input"
          />
          <div className="outsideWrapper">
            <div className="insideWrapper">
              {state.image.loaded ? (
                <img
                  src={state.image.url}
                  className="coveredImage"
                  alt="memes image"
                />
              ) : state.image.loading ? (
                <Loader />
              ) : null}
              <canvas ref={canvasRef} className="canvas" />
            </div>
          </div>
          <textarea
            placeholder="Enter your caption here ..."
            name="placeholder"
            className="textarea"
            rows="4"
            onChange={onChangeText}
          />
        </div>
      </div>
      <div className="column2">
        <div className="row">
          <div>
            <button
              disabled={state.query.trim().length > 0 ? false : true}
              onClick={getMemes}
              className="button"
            >
              Load Image
            </button>
            <button
              disabled={state.query.trim().length > 0 ? false : true}
              onClick={saveMeme}
              className="button"
            >
              Save Meme
            </button>
          </div>
          <ImageGallery data={state.savedMemes} />
          <div className="position">
            <Radio.Group onChange={onChangePosition} value={state.position}>
              <Radio style={radioStyle} value="top">
                Top
              </Radio>
              <Radio style={radioStyle} value="center">
                Center
              </Radio>
              <Radio style={radioStyle} value="bottom">
                Bottom
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

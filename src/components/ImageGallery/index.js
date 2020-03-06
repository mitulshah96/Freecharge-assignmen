import React, { memo, useRef, useEffect } from 'react';

let canvasRefs = [];
function ImageGallery(props) {
    const canvasRef = useRef();

    function calculatePosition(context, position) {
        if (position === 'top') {
            return 30;
        } else if (position === 'center') {
            return context.canvas.height / 2;
        } else {
            return context.canvas.height - 10;
        }
    }

    useEffect(() => {
        canvasRefs.map((canvas, index) => {
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const textWidth = ctx.measureText(props.data[index].placeholder)
                    .width;
                ctx.font = '14px Courier';
                ctx.fillStyle = '#FFF';
                ctx.textAlign = props.data[index].position;
                ctx.fontSize = 10;

                ctx.fillText(
                    props.data[index].placeholder,
                    ctx.canvas.width / 2 - textWidth / 2,
                    calculatePosition(ctx, props.data[index].position)
                );
            }
        });
    }, [props.data]);

    return (
        <div className="saved">
            <div className="title">
                <h1 className="title">Saved Memes</h1>
            </div>

            <div className="imageTileContainer">
                {props.data.map((item, index) => {
                    return (
                        <div className="outsideWrapperTile">
                            <div className="insideWrapperTile">
                                <img src={item.url} className="coveredImage" />
                                <canvas
                                    ref={ref => (canvasRefs[index] = ref)}
                                    className="canvas"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(ImageGallery);

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid } from "@mui/material";
import a3 from "../assets/images/asset3.jpg"
import a4 from "../assets/images/asset4.jpg"
import a6 from "../assets/images/home/asset1.png"
import a7 from "../assets/images/home/asset2.png"
import a8 from "../assets/images/home/asset3.png"
import a9 from "../assets/images/home/asset4.png"
import a10 from "../assets/images/home/asset5.png"
import a11 from "../assets/images/home/asset6.png"
import a12 from "../assets/images/home/asset7.png"

const images = [a3, a4, a6, a7, a8, a9, a10, a11, a12];
function ImageTheme() {
    const [image, setImage] = React.useState(images[0]);
    React.useEffect(() => {
        setImage(images[Math.floor(Math.random() * images.length)]);
    }, [images]);
  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(" + image + ")",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
}

export default ImageTheme;

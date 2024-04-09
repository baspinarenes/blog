import { SITE_URL } from "@/lib/constants";

export const MetaImage: React.FC<MetaImageProps> = (props) => {
  const { category, title, description } = props;

  return (
    <div
      style={{
        backgroundColor: "#DFE4E9",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        padding: "32px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flex: 1,
          }}
        >
          <img
            alt="Profile img"
            src={`${SITE_URL}/images/scream.png`}
            width={360}
            height={360}
            style={{
              position: "absolute",
              bottom: "-1px",
              height: "280px",
              width: "280px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "36px",
            gap: "12px",
            borderTop: "2px solid #CED4DA",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bolder",
              }}
            >
              {title}
            </span>
            <span>{category}</span>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "regular",
              fontFamily: "JetBrainsMono-Regular",
            }}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export type MetaImageProps = {
  category?: string;
  title: string;
  description: string;
};

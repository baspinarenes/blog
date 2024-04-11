import { SITE_URL } from "@/lib/constants";
import { capitalize } from "@/lib/utils/common";

export const MetaImage: React.FC<MetaImageProps> = (props) => {
  const { title, description, logo, tags = [] } = props;

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
          {logo && (
            <img
              alt="Category logo"
              src={logo}
              style={{
                height: "200px",
                width: "200px",
              }}
            />
          )}
          {!logo && (
            <img
              alt="Scream img"
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
          )}
          {tags.length > 0 && (
            <div
              style={{
                borderRadius: "8px",
                color: "gray",
                position: "absolute",
                right: "24px",
                bottom: "6px",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
              {tags.map((t) => `#${t}`).join(", ")}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px 36px",
            gap: "8px",
            borderTop: "2px solid #CED4DA",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                lineHeight: "1",
                marginBottom: "12px",
                fontFamily: "JetBrainsMono-Bold",
              }}
            >
              {capitalize(title)}
            </div>
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
  title: string;
  description: string;
  tags?: string[];
  logo?: string;
};

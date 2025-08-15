import IconCloud from "@/components/magicui/icon-cloud";

const slugs = [
  "shopify",
  "typescript",
  "javascript",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "tailwindcss",
  "shopify",
  "react",
  "tailwindcss",
  "shopify",
  "react",
];

export function IconCloudHome() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg bg-muted px-10 pb-20 pt-8 ">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

// app/[handle]/page.js
import { getProfileByHandle } from "@/app/lib/mongodb";
import ProfileClient from "./ProfileClient";

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const rawProfile = await getProfileByHandle(handle);

  if (!rawProfile) {
    return {
      title: `@${handle} — Claim this BitTree Bio Link`,
      description: `Claim the handle @${handle} on BitTree and create your aesthetic link in bio.`,
    };
  }

  const profile = JSON.parse(JSON.stringify(rawProfile));

  return {
    title: `${profile.displayName || profile.handle} (@${profile.handle}) — BitTree`,
    description:
      profile.bio || `Explore all links and social profiles for ${profile.displayName || profile.handle} on BitTree.`,
    openGraph: {
      title: `${profile.displayName || profile.handle} — BitTree`,
      description: profile.bio || "All my official links in one bio.",
      images: [
        {
          url: profile.pic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          width: 400,
          height: 400,
          alt: profile.displayName || profile.handle,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { handle } = await params;
  const rawProfile = await getProfileByHandle(handle);
  const profile = rawProfile ? JSON.parse(JSON.stringify(rawProfile)) : null;

  return <ProfileClient profile={profile} handle={handle} />;
}
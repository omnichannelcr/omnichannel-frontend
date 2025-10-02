import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Layout } from "@/components";
import { UserProfile } from "@/types/navigation";

// Sample user data - in a real app, this would come from authentication
const sampleUser: UserProfile = {
  name: "John Smith",
  email: "jnsmith99@gmail.com",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=John%20Smith"
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Layout user={sampleUser}>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}

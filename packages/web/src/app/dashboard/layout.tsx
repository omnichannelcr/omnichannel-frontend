import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Layout } from "@/components";
import { UserProfile } from "@/types/navigation";

// Sample user data - in a real app, this would come from authentication
const sampleUser: UserProfile = {
  name: "John Smith",
  email: "jnsmith99@gmail.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format"
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

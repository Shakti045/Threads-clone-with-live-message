import { currentUser } from "@clerk/nextjs";
import ProfileForm from "@/components/forms/ProfileForm";


const Onboarding = async () => {
  const user:any = await currentUser();
  const userData = {
    id: user.id,
    username:user.username,
    name:user.firstName?user.firstName: "",
    bio: "",
    image:user.imageUrl?user.imageUrl:"",
  };
  

  return (
    <main className='mx-auto flex max-w-3xl w-full flex-col justify-start px-10 py-20'>
    <h1 className='head-text'>Onboarding</h1>
    <p className='mt-3 text-base-regular text-light-2'>
      Complete your profile now, to use Threds.
    </p>

    <section className='mt-9  w-[50%] sm:w-[100%] bg-dark-2 p-10'>
      <ProfileForm {...userData} />
    </section>
  </main>
  )
}

export default Onboarding;
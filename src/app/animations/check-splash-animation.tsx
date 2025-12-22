import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Check from '../../../public/assets/check-box.svg'

interface ICheckSplashAnimation {
  title: string
}

export function CheckSplashAnimation({ title }: ICheckSplashAnimation) {
  return(
    <AnimatePresence>
      <motion.div
        className='h-svh absolute z-30 inset-0 flex bg-zinc-950/70'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="m-auto flex flex-col gap-3 items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <Image
              src={Check}
              alt='Image CheckBox asset'
              height={88}
            />
          </motion.div>
          <motion.span
            className="tracking-wide text-xl text-center text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6,
            }}
          >
            {title}
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
import { motion } from "framer-motion";
import clsx from "clsx";
import AttackIcon from "../../../assets/attack.png";
import CatchIcon from "@/assets/pokador.png";
import AttackBg from "@/assets/attack-button-bg.png";
import { colors } from "@/tailwind/colors/colors";
import type { FightButtonProps } from "@/lib/types";
import { useState } from "react";

const shakeAnimation = {
  shake: {
    x: [0, -6, 6, -6, 6, 0],
    transition: { duration: 0.4 },
  },
};

function FightButton({ type, className, targetHp }: FightButtonProps) {
  const isAttack = type === "attack";
  const [isShaking, setIsShaking] = useState(false);

  const imageSrc = isAttack ? AttackIcon : CatchIcon;
  const label = isAttack ? "ATTACK" : "CATCH";

  const bgStyle = isAttack
    ? {
        backgroundImage: `url(${AttackBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundColor: colors.neutrals[100],
      };

  const handleClick = () => {
    if (!isAttack && (targetHp ?? 100) > 33) {
      // אם מנסים לתפוס פוקימון עם יותר מדי חיים — רק רעידה
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
  };

  return (
    <motion.button
      animate={isShaking ? "shake" : "none"}
      variants={shakeAnimation}
      onClick={handleClick}
      style={bgStyle}
      className={clsx(
        "w-140 h-140 rounded-full flex flex-col justify-center items-center shadow-md border-[3px] border-black",
        className
      )}
    >
      <img src={imageSrc} alt="icon" className="w-54 h-54 mb-1" />
      <span
        className="text-headingLgBold font-mulish text-neutrals-white"
        style={{
          WebkitTextStroke: "1.31px black",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

export { FightButton };

import { motion } from "framer-motion";
import clsx from "clsx";
import AttackIcon from "../../../assets/attack.png";
import CatchIcon from "@/assets/pokador.png";
import AttackBg from "@/assets/attack-button-bg.png";
import { colors } from "@/tailwind/colors/colors";
import type { FightButtonProps } from "@/lib/types";
import { useState } from "react";
import { baseMissChance, randomFactor, buttonsVariant } from "@/lib/constants";


const shakeAnimation = {
  shake: {
    x: [0, -6, 6, -6, 6, 0],
    transition: { duration: 0.4 },
  },
};

function FightButton({
  type,
  className,
  targetHp,
  attackerAttack,
  defenderDefense,
  onAttack,
  onCatchSuccess,
  onCatchFail,
  disabled = false,
  rivalHp = 100,
}: FightButtonProps) {
  const isAttack = type === buttonsVariant.Attack;
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

  function calculateDamage({
    attackerAttack,
    defenderDefense,
    level = 50,
    power = 60,
    accuracy = 100, 
    evasion = 0,
  }: {
    attackerAttack: number;
    defenderDefense: number;
    level?: number;
    power?: number;
    accuracy?: number;
    evasion?: number;
  }) {
    const accuracyModifier = accuracy / 100;
    const evasionModifier = 1 + evasion / 100;
    const finalHitChance =
      (1 - baseMissChance) * (accuracyModifier / evasionModifier);

    if (Math.random() > finalHitChance) {
      return 0; 
    }

    const numerator =
      ((2 * level) / 5 + 2) * power * (attackerAttack / defenderDefense);
    const baseDamage = numerator / 50 + 2;

    return Math.floor(baseDamage * randomFactor);
  }

  const handleClick = () => {
    if (!isAttack) {

      const catchRate = (targetHp ?? 100) <= 0.2 * rivalHp ? 0.2 : 0.1;
      const didCatch = Math.random() < catchRate;

      if (didCatch) {
        onCatchSuccess?.();
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 400);
        onCatchFail?.();
      }
    } else {
      if (attackerAttack && defenderDefense && onAttack && !disabled) {
        const damage = calculateDamage({ attackerAttack, defenderDefense });
        onAttack(damage);
      }
    }
  };

  return (
    <motion.button
      animate={isShaking ? "shake" : "none"}
      variants={shakeAnimation}
      onClick={handleClick}
      style={bgStyle}
      className={clsx(
        "w-140 h-140 rounded-full flex flex-col justify-center items-center shadow-md border-[3px] border-black cursor-pointe hover:border-[3px] hover:border-primary-600",
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

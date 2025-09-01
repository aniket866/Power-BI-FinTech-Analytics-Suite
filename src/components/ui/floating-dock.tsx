import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react"; // For dropdown

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    dropdown?: { title: string; href: string }[];
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    dropdown?: { title: string; href: string }[];
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.dropdown ? (
                  <Dropdown item={item} />
                ) : (
                  <a
                    href={item.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white dark:bg-neutral-900"
                  >
                    <div className="h-6 w-6">{item.icon}</div>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-6 w-6" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    dropdown?: { title: string; href: string }[];
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-24 items-end gap-6 rounded-3xl bg-black px-6 pb-4 text-white md:flex dark:bg-neutral-900",
        className
      )}
    >
      {items.map((item) =>
        item.dropdown ? (
          <Dropdown key={item.title} item={item} mouseX={mouseX} />
        ) : (
          <IconContainer key={item.title} mouseX={mouseX} {...item} />
        )
      )}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-150, 0, 150], [50, 90, 50]);
  const iconSizeTransform = useTransform(distance, [-150, 0, 150], [24, 48, 24]);

  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const iconSize = useSpring(iconSizeTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a href={href} className="flex flex-col items-center">
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-full bg-neutral-800"
      >
        <motion.div style={{ width: iconSize, height: iconSize }}>{icon}</motion.div>
      </motion.div>
      <p className="mt-2 text-xs">{title}</p>
    </a>
  );
}

function Dropdown({
  item,
  mouseX,
}: {
  item: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    dropdown?: { title: string; href: string }[];
  };
  mouseX?: MotionValue;
}) {
  return (
    <Menu as="div" className="relative flex flex-col items-center">
      <Menu.Button>
        <IconContainer mouseX={mouseX!} title={item.title} icon={item.icon} href={item.href} />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-full mt-2 w-48 rounded-xl bg-black text-white shadow-lg ring-1 ring-white/10 focus:outline-none">
          {item.dropdown?.map((option, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <a
                  href={option.href}
                  className={`block px-4 py-2 text-sm ${
                    active ? "bg-neutral-700" : ""
                  }`}
                >
                  {option.title}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
      <p className="mt-2 text-xs">{item.title}</p>
    </Menu>
  );
}

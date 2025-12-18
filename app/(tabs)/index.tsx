import { Image, StyleSheet, ScrollView, View, Pressable, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

// Breakpoints for responsive design
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

// Calculate number of columns based on screen width
function getColumnsAndCardWidth(screenWidth: number) {
  const padding = 16;
  const gap = 16;

  if (screenWidth >= BREAKPOINTS.desktop) {
    // Desktop: 4 columns, max container width of 1200px
    const containerWidth = Math.min(screenWidth, 1200);
    const columns = 4;
    const cardWidth = (containerWidth - padding * 2 - gap * (columns - 1)) / columns;
    return { columns, cardWidth, containerWidth };
  } else if (screenWidth >= BREAKPOINTS.tablet) {
    // Tablet: 3 columns
    const columns = 3;
    const cardWidth = (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
    return { columns, cardWidth, containerWidth: screenWidth };
  } else {
    // Mobile: 2 columns
    const columns = 2;
    const cardWidth = (screenWidth - padding * 2 - gap * (columns - 1)) / columns;
    return { columns, cardWidth, containerWidth: screenWidth };
  }
}

// Dummy product data
const PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    rating: 4.5,
    reviews: 128,
    image: 'https://picsum.photos/seed/headphones/300/300',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 199.99,
    rating: 4.8,
    reviews: 256,
    image: 'https://picsum.photos/seed/watch/300/300',
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 49.99,
    rating: 4.2,
    reviews: 89,
    image: 'https://picsum.photos/seed/speaker/300/300',
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 34.99,
    rating: 4.6,
    reviews: 312,
    image: 'https://picsum.photos/seed/stand/300/300',
  },
  {
    id: '5',
    name: 'USB-C Hub',
    price: 59.99,
    rating: 4.4,
    reviews: 167,
    image: 'https://picsum.photos/seed/hub/300/300',
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 129.99,
    rating: 4.7,
    reviews: 445,
    image: 'https://picsum.photos/seed/keyboard/300/300',
  },
  {
    id: '7',
    name: 'Wireless Mouse',
    price: 39.99,
    rating: 4.3,
    reviews: 203,
    image: 'https://picsum.photos/seed/mouse/300/300',
  },
  {
    id: '8',
    name: 'Monitor Light Bar',
    price: 54.99,
    rating: 4.5,
    reviews: 98,
    image: 'https://picsum.photos/seed/lightbar/300/300',
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const starColor = '#FFB800';

  return (
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, index) => (
        <ThemedText
          key={index}
          style={[
            styles.star,
            { color: index < fullStars || (index === fullStars && hasHalfStar) ? starColor : '#D3D3D3' },
          ]}>
          ★
        </ThemedText>
      ))}
    </View>
  );
}

function ProductCard({ product, cardWidth }: { product: typeof PRODUCTS[0]; cardWidth: number }) {
  const cardBackground = useThemeColor({ light: '#fff', dark: '#2A2A2A' }, 'background');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: cardBackground, opacity: pressed ? 0.8 : 1, width: cardWidth },
      ]}>
      <Image source={{ uri: product.image }} style={[styles.productImage, { height: cardWidth }]} resizeMode="cover" />
      <View style={styles.cardContent}>
        <ThemedText style={styles.productName} numberOfLines={2}>
          {product.name}
        </ThemedText>
        <View style={styles.ratingRow}>
          <StarRating rating={product.rating} />
          <ThemedText style={styles.reviews}>({product.reviews})</ThemedText>
        </View>
        <ThemedText style={styles.price}>${product.price.toFixed(2)}</ThemedText>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const { cardWidth } = getColumnsAndCardWidth(screenWidth);
  const headerBackground = useThemeColor({ light: '#0a7ea4', dark: '#1D3D47' }, 'background');
  const isDesktop = screenWidth >= BREAKPOINTS.desktop;

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerBackground }]}>
        <View style={isDesktop ? { maxWidth: 1200, alignSelf: 'center', width: '100%' } : undefined}>
          <ThemedText style={styles.headerTitle} lightColor="#fff" darkColor="#fff">
            ShopNow
          </ThemedText>
          <ThemedText style={styles.headerSubtitle} lightColor="#e0e0e0" darkColor="#ccc">
            Discover amazing products
          </ThemedText>
        </View>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={isDesktop ? { maxWidth: 1200, alignSelf: 'center', width: '100%' } : undefined}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Featured Products</ThemedText>
            <ThemedText style={styles.seeAll}>See All</ThemedText>
          </View>
          <View style={styles.productsGrid}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} cardWidth={cardWidth} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#0a7ea4',
    fontSize: 14,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
    marginRight: 1,
  },
  reviews: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
});
